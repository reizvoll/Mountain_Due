import { supabase } from './supabaseClient';

async function updateProfileTxt(uid, dataObj) {
    const { columnName, newData } = dataObj;

    try {
        const { error } = await supabase
            .from("users")
            .update({ [columnName]: newData })
            .eq("id", uid) // 특정 ID와 매칭

        if (error) {
            if (error.message.includes('duplicate key value violates unique constraint')) {
                return { error: '이미 존재하는 닉네임입니다.' };
            }
            console.error("업데이트 중 오류 발생:", error.message);
            return { error: error.message };
        }
        return {};
    } catch (err) {
        console.error("업데이트 중 알 수 없는 오류 발생:", err.message);
        return { error: err.message };
    }
}

// 프로필 이미지 URL 업데이트
async function updateProfileImg(uid, newImageUrl) {
    try {
        // 데이터베이스에 새 이미지 URL 업데이트
        const { error } = await supabase
            .from("users")
            .update({ img_url: newImageUrl }) // img_url 필드 업데이트
            .eq("id", uid); // 특정 유저 ID와 매칭

        if (error) {
            console.error("프로필 이미지 업데이트 중 오류:", error.message);
            return { error: error.message };
        }

        return { success: true }; // 성공적으로 업데이트
    } catch (err) {
        console.error("프로필 이미지 업데이트 실패:", err.message);
        return { error: err.message };
    }
}

export { updateProfileTxt, updateProfileImg };