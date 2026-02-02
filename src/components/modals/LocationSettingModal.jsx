import React, { useEffect, useRef, useState } from "react";
import S from "./ModalStyle";

const KAKAO_APP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
const KAKAO_LOCAL_ENDPOINT = "https://dapi.kakao.com/v2/local/search/address.json";

let kakaoLoadPromise;
const KAKAO_CACHE_BUST = Date.now();

const loadKakaoMaps = () => {
  if (kakaoLoadPromise) return kakaoLoadPromise;
  kakaoLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("window is undefined"));
      return;
    }

    console.log("[LocationSettingModal] appkey typeof", typeof KAKAO_APP_KEY);
    console.log("[LocationSettingModal] appkey raw", KAKAO_APP_KEY);
    const sanitizedKey = (KAKAO_APP_KEY || "").trim();
    console.log("[LocationSettingModal] appkey sanitized", sanitizedKey);
    if (!sanitizedKey) {
      console.error("Kakao Maps API key is missing");
      reject(new Error("Kakao Maps API key is missing"));
      return;
    }
    if (sanitizedKey !== KAKAO_APP_KEY) {
      console.warn("Kakao Maps API key had extra whitespace. Using trimmed key.");
    }

    const ensureLoaded = () => {
      if (!window.kakao || !window.kakao.maps) {
        reject(new Error("Kakao Maps is not available after script load."));
        return;
      }
      window.kakao.maps.load(() => {
        console.log("카카오 스크립트 로드 성공");
        resolve(window.kakao);
      });
    };

    const expectedSrc = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${sanitizedKey}&autoload=false&libraries=services&ts=${KAKAO_CACHE_BUST}`;
    const existingScript = document.getElementById("kakao-map-script");
    if (existingScript) {
      if (existingScript.src !== expectedSrc) {
        existingScript.remove();
        kakaoLoadPromise = null;
      } else {
      if (window.kakao && window.kakao.maps) {
        ensureLoaded();
        return;
      }
      existingScript.addEventListener("load", ensureLoaded);
      existingScript.addEventListener("error", reject);
      return;
      }
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = expectedSrc;
    console.log("[LocationSettingModal] kakao script src", script.src);
    script.async = true;
    script.dataset.kakaoMaps = "true";
    script.referrerPolicy = "no-referrer-when-downgrade";
    script.onload = ensureLoaded;
    script.onerror = () => {
      console.error("Failed to load Kakao Maps script.");
      console.log("네트워크 확인 필요");
      reject(new Error("Failed to load Kakao Maps script."));
    };
    document.head.appendChild(script);
  });
  return kakaoLoadPromise;
};

const LocationSettingModal = ({ isOpen, onClose, onComplete }) => {
  const [address, setAddress] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedResultKey, setSelectedResultKey] = useState("");
  const [mapError, setMapError] = useState("");
  const [mapKey, setMapKey] = useState(0);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const dragHandlerRef = useRef(null);
  const idleHandlerRef = useRef(null);
  const userDraggedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsAddressSelected(false);
    setIsSearched(false);
    setAddress("");
    setAddresses([]);
    setSelectedResultKey("");
    setMapKey((prev) => prev + 1);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isAddressSelected) return undefined;
    let isMounted = true;
    const hasWindow = typeof window !== "undefined";
    const kakaoGlobal = hasWindow ? window.kakao : undefined;
    const inlineScript = hasWindow
      ? document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')
      : null;

    console.log("[LocationSettingModal] isOpen", isOpen);
    console.log("[LocationSettingModal] REACT_APP_KAKAO_MAP_KEY", KAKAO_APP_KEY);
    console.log("[LocationSettingModal] window.kakao exists", Boolean(kakaoGlobal));
    console.log(
      "[LocationSettingModal] window.kakao.maps exists",
      Boolean(kakaoGlobal && kakaoGlobal.maps)
    );
    console.log(
      "[LocationSettingModal] inline kakao script src",
      inlineScript?.getAttribute("src")
    );

    const initMap = (kakao) => {
      if (!kakao?.maps) {
        console.error("Kakao Maps object is not available.");
        setMapError("카카오 지도 객체가 없습니다.");
        return;
      }
      if (!isMounted || !mapContainerRef.current) return;
      if (mapRef.current) {
        mapRef.current.relayout();
        return;
      }

      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const map = new kakao.maps.Map(mapContainerRef.current, {
        center,
        level: 3,
      });
      mapRef.current = map;
      geocoderRef.current = new kakao.maps.services.Geocoder();
      map.relayout();

      const handleDragStart = () => {
        userDraggedRef.current = true;
      };

      const handleIdle = () => {
        if (!userDraggedRef.current) return;
        userDraggedRef.current = false;
        const currentCenter = map.getCenter();
        geocoderRef.current.coord2Address(
          currentCenter.getLng(),
          currentCenter.getLat(),
          (result, status) => {
            if (status !== kakao.maps.services.Status.OK) return;
            const nextAddress =
              result[0]?.road_address?.address_name ||
              result[0]?.address?.address_name ||
              "";
            setAddress(nextAddress);
            setIsSearched(Boolean(nextAddress));
          }
        );
      };

      dragHandlerRef.current = handleDragStart;
      idleHandlerRef.current = handleIdle;
      kakao.maps.event.addListener(map, "dragstart", handleDragStart);
      kakao.maps.event.addListener(map, "idle", handleIdle);
    };

    const timer = setTimeout(() => {
      if (window.kakao?.maps) {
        initMap(window.kakao);
        return;
      }
      loadKakaoMaps()
        .then((kakao) => initMap(kakao))
        .catch((error) => {
          if (!isMounted) return;
          console.error("Kakao Maps load failed:", error);
          setMapError(error?.message || "지도 로딩에 실패했습니다.");
        });
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (window.kakao && mapRef.current) {
        if (dragHandlerRef.current) {
          window.kakao.maps.event.removeListener(
            mapRef.current,
            "dragstart",
            dragHandlerRef.current
          );
        }
        if (idleHandlerRef.current) {
          window.kakao.maps.event.removeListener(mapRef.current, "idle", idleHandlerRef.current);
        }
      }
      mapRef.current = null;
      geocoderRef.current = null;
      userDraggedRef.current = false;
    };
  }, [isOpen, isAddressSelected]);

  useEffect(() => {
    if (!isOpen) return;
    if (!address.trim()) {
      setAddresses([]);
      setSelectedResultKey("");
      setIsSearched(false);
      return;
    }

    if (!KAKAO_REST_KEY) {
      console.error("Kakao Local REST API key is missing");
      setAddresses([]);
      setSelectedResultKey("");
      setIsSearched(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          query: address.trim(),
          size: "10",
          page: "1",
        });
        const response = await fetch(`${KAKAO_LOCAL_ENDPOINT}?${params.toString()}`, {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
          },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Kakao Local API request failed");
        const data = await response.json();
        const documents = data?.documents || [];
        setAddresses(documents);
        setSelectedResultKey("");

        const first = documents[0];
        if (first && mapRef.current && window.kakao?.maps) {
          const lat = parseFloat(first.y);
          const lng = parseFloat(first.x);
          const nextCenter = new window.kakao.maps.LatLng(lat, lng);
          mapRef.current.setCenter(nextCenter);
        }
        setIsSearched(Boolean(documents.length));
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Kakao Local API error:", error);
        setAddresses([]);
        setSelectedResultKey("");
        setIsSearched(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [address, isOpen]);

  const handleAddressChange = (event) => {
    const nextValue = event.target.value;
    setAddress(nextValue);
    setIsAddressSelected(nextValue.trim().length > 0);
    setIsSearched(nextValue.trim().length > 0);
    if (!nextValue.trim()) {
      setSelectedResultKey("");
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    if (!isAddressSelected) {
      setIsAddressSelected(true);
      setTimeout(() => handleCurrentLocation(), 0);
      return;
    }
    if (!mapRef.current) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const kakao = window.kakao;
        const nextCenter = new kakao.maps.LatLng(latitude, longitude);
        mapRef.current.setCenter(nextCenter);
        mapRef.current.relayout();
        if (geocoderRef.current) {
          geocoderRef.current.coord2Address(longitude, latitude, (result, status) => {
            if (status !== kakao.maps.services.Status.OK) return;
            const nextAddress =
              result[0]?.road_address?.address_name ||
              result[0]?.address?.address_name ||
              "";
            setAddress(nextAddress);
            setIsSearched(Boolean(nextAddress));
          });
        }
      },
      (error) => {
        setMapError(error?.message || "현재 위치를 불러오지 못했습니다.");
      }
    );
  };

  const handleResultClick = (result, resultKey) => {
    if (!mapRef.current) return;
    const kakao = window.kakao;
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);
    const nextCenter = new kakao.maps.LatLng(lat, lng);
    mapRef.current.setCenter(nextCenter);
    setAddress(result.address_name);
    setIsAddressSelected(true);
    setIsSearched(true);
    setSelectedResultKey(resultKey);
  };

  const handleComplete = () => {
    const center = mapRef.current?.getCenter();
    onComplete?.({
      address,
      lat: center?.getLat(),
      lng: center?.getLng(),
    });
  };

  if (!isOpen) return null;

  const addressItems = addresses.map((result) => {
    const key = `${result.x}-${result.y}-${result.address_name}`;
    const label = result.address_name;
    return {
      key,
      label,
      result,
    };
  });

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer $variant="horizontal" onClick={(event) => event.stopPropagation()}>
        <S.CloseButton type="button" onClick={onClose}>
          ×
        </S.CloseButton>
        <S.Title>내 지역 설정</S.Title>
        <S.Subtitle>내 지역을 선택해서 맞춤형 정보를 한 눈에!</S.Subtitle>

        <S.MapGrid>
          <S.MapTopColumn $spanAll={!isAddressSelected}>
            <S.MapPanel
              key={mapKey}
              id="map"
              $height={isAddressSelected ? "100%" : "100%"}
              $fullHeight={!isAddressSelected}
            >
              {isAddressSelected ? (
                <>
                  <S.MapCanvas ref={mapContainerRef} />
                  <S.MapPinWrapper>
                    <S.MapPin />
                  </S.MapPinWrapper>
                </>
              ) : null}
              {!isAddressSelected ? <S.MapText>주소를 입력해주세요.</S.MapText> : null}
              {!isAddressSelected ? (
                <S.MapHelperRow>
                  <S.MapHelper>
                    <S.MapLink type="button" onClick={handleCurrentLocation}>
                      현재 위치로 보기
                    </S.MapLink>
                  </S.MapHelper>
                </S.MapHelperRow>
              ) : null}
              {isAddressSelected && mapError && mapError !== "User denied Geolocation" ? (
                <S.MapText>{mapError}</S.MapText>
              ) : null}
            </S.MapPanel>
          </S.MapTopColumn>

          <S.ContentTopColumn>
            <S.Section>
              <S.Label htmlFor="setting-address">주소 검색</S.Label>
              <S.Input
                id="setting-address"
                value={address}
                onChange={handleAddressChange}
                placeholder="예) 서울특별시 강남구 테헤란로 11길 50, 안타워"
              />
            </S.Section>

            <S.Section>
              <S.ResultPanel>
                {addressItems.length ? (
                  <S.ResultList>
                    {addressItems.map((addressItem) => {
                      const resultKey = addressItem.key;
                      return (
                      <S.ResultItem
                        key={resultKey}
                        $selected={selectedResultKey === resultKey}
                        onClick={() => handleResultClick(addressItem.result, resultKey)}
                      >
                        {addressItem.label}
                        <S.ResultBadge>선택</S.ResultBadge>
                      </S.ResultItem>
                      );
                    })}
                  </S.ResultList>
                ) : (
                  <S.ResultEmpty>검색 결과가 없습니다</S.ResultEmpty>
                )}
              </S.ResultPanel>
            </S.Section>
          </S.ContentTopColumn>

          {isAddressSelected ? (
            <S.MapBottomRow>
              <S.MapHelperRow>
                <S.MapHelper>
                  <span>지도를 움직여서 위치를 찍어주세요!</span>
                  <S.MapLink type="button" onClick={handleCurrentLocation}>
                    현재 위치로 보기
                  </S.MapLink>
                </S.MapHelper>
              </S.MapHelperRow>
            </S.MapBottomRow>
          ) : null}

          <S.ButtonRow>
            <S.PrimaryButton
              type="button"
              $active={isSearched}
              disabled={!isSearched}
              onClick={handleComplete}
            >
              지역 설정하기
            </S.PrimaryButton>
          </S.ButtonRow>
        </S.MapGrid>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default LocationSettingModal;
