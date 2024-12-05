import { useState } from "react";
import { supabase } from "../api/supabaseClient";

const useProfile = () => {
  const [profile, setProfile] = useState({
    nickname: "",
    img_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 프로필 데이터 가져오기
  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("nickname, img_url")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 닉네임 업데이트
  const updateNickname = async (userId, newNickname) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .update({ nickname: newNickname })
        .eq("id", userId);

      if (error) throw error;
      setProfile((prev) => ({ ...prev, nickname: newNickname }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 이미지 업데이트
  const updateImage = async (userId, imageUrl) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .update({ img_url: imageUrl })
        .eq("id", userId);

      if (error) throw error;
      setProfile((prev) => ({ ...prev, img_url: imageUrl }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateNickname,
    updateImage,
  };
};

export default useProfile;