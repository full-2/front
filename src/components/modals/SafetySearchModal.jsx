import React, { useEffect, useRef, useState } from "react";
import S from "./ModalStyle";

const KAKAO_APP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

let kakaoLoadPromise;
const KAKAO_CACHE_BUST = Date.now();

const loadKakaoMaps = () => {
  if (kakaoLoadPromise) return kakaoLoadPromise;
  kakaoLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("window is undefined"));
      return;
    }

    console.log("[SafetySearchModal] appkey typeof", typeof KAKAO_APP_KEY);
    console.log("[SafetySearchModal] appkey raw", KAKAO_APP_KEY);
    const sanitizedKey = (KAKAO_APP_KEY || "").trim();
    console.log("[SafetySearchModal] appkey sanitized", sanitizedKey);
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
    console.log("[SafetySearchModal] kakao script src", script.src);
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

const SafetySearchModal = ({ isOpen, onClose, onConfirm }) => {
  const [address, setAddress] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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

    console.log("[SafetySearchModal] isOpen", isOpen);
    console.log("[SafetySearchModal] REACT_APP_KAKAO_MAP_KEY", KAKAO_APP_KEY);
    console.log("[SafetySearchModal] window.kakao exists", Boolean(kakaoGlobal));
    console.log(
      "[SafetySearchModal] window.kakao.maps exists",
      Boolean(kakaoGlobal && kakaoGlobal.maps)
    );
    console.log(
      "[SafetySearchModal] inline kakao script src",
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
      console.log("지도 객체 생성 완료");

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
    if (!geocoderRef.current || !mapRef.current) return;
    if (!address.trim()) return;

    const kakao = window.kakao;
    geocoderRef.current.addressSearch(address, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return;
      const first = result?.[0];
      if (!first) return;
      const lat = parseFloat(first.y);
      const lng = parseFloat(first.x);
      const nextCenter = new kakao.maps.LatLng(lat, lng);
      mapRef.current.setCenter(nextCenter);
      setIsSearched(true);
    });
  }, [address, isOpen]);

  const handleAddressChange = (event) => {
    const nextValue = event.target.value;
    setAddress(nextValue);
    setIsAddressSelected(nextValue.trim().length > 0);
    setIsSearched(nextValue.trim().length > 0);
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

  const handleConfirm = () => {
    const center = mapRef.current?.getCenter();
    onConfirm?.({
      address,
      isSaved,
      lat: center?.getLat(),
      lng: center?.getLng(),
    });
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer $variant="vertical" onClick={(event) => event.stopPropagation()}>
        <S.CloseButton type="button" onClick={onClose}>
          ×
        </S.CloseButton>
        <S.Title>지역 선택</S.Title>
        <S.Subtitle>안전점수를 확인하고 싶은 지역을 선택해주세요.</S.Subtitle>

        <S.Section>
          <S.Label htmlFor="safety-address">주소 검색</S.Label>
          <S.Input
            id="safety-address"
            value={address}
            onChange={handleAddressChange}
            placeholder="예) 서울특별시 강남구 테헤란로 11길 50, 안타워"
          />
        </S.Section>

        <S.Section>
          <S.MapPanel key={mapKey} id="map" $height="244px">
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
          {isAddressSelected ? (
            <S.MapHelperRow>
              <S.MapHelper>
                <span>지도를 움직여서 위치를 찍어주세요!</span>
                <S.MapLink type="button" onClick={handleCurrentLocation}>
                  현재 위치로 보기
                </S.MapLink>
              </S.MapHelper>
            </S.MapHelperRow>
          ) : null}
        </S.Section>

        <S.Section>
          <S.CheckboxRow>
            <S.Checkbox
              type="checkbox"
              checked={isSaved}
              onChange={(event) => setIsSaved(event.target.checked)}
            />
            선택한 지역 저장하기
          </S.CheckboxRow>
        </S.Section>

        <S.PrimaryButton
          type="button"
          $active={isSearched}
          disabled={!isSearched}
          onClick={handleConfirm}
        >
          안전점수 확인하기
        </S.PrimaryButton>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default SafetySearchModal;
