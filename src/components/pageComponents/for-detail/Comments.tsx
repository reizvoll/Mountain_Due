import React from 'react';
import { BiSolidComment } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuPencilLine } from 'react-icons/lu';
import Btn from '../ui/Btn';

const Comments = () => {
    return (
        <div className="flex flex-col gap-8 pt-10">
            <div className="flex items-end gap-2">
                <BiSolidComment className=" text-2xl text-black" />
                <span>1</span>
            </div>
            <form className="flex items-center gap-2" onSubmit={() => {}}>
                <textarea className="w-full border border-gray-500 rounded-xl resize-none p-2" placeholder="리뷰를 입력해 주세요."></textarea>
                <Btn onClick={() => {}}>작성하기</Btn>
            </form>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        <p className="text-lg">닉네임</p>
                    </div>
                    <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4">
                        <p className="text-lg">댓글 내용</p>
                        <div className="flex gap-4">
                            <LuPencilLine className="text-lg text-black" />
                            <RiDeleteBin6Line className="text-lg text-black" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
