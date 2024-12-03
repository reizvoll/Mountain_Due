import React from 'react';
import { BiSolidComment } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuPencilLine } from 'react-icons/lu';
import Btn from '../ui/Btn';
import useForm from '../../../hooks/useForm';
import useUser from '../../../hooks/useUser';
import { useComments } from '../../../hooks/useComments';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const Comments = () => {
    const { id: spotId } = useParams();
    const { comments, createMutation, updateMutation, deleteMutation } = useComments(spotId);
    const { user } = useUser();

    const { values: createValues, handleChange: handleCreateChange } = useForm({
        content: ''
    });

    const {
        values: updateValues,
        handleChange: handleUpdateChange,
        handleMultiple,
        handleReset
    } = useForm({
        id: '',
        content: ''
    });

    /* 리뷰 작성 */
    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate({ userId: user.id, placeId: spotId, ...createValues });
    };

    /* 리뷰 수정 모드로 변경 */
    const handleChangeMode = ({ id, content }) => {
        handleMultiple([
            { name: 'id', selected: id },
            { name: 'content', selected: content }
        ]);
    };

    /* 리뷰 수정 */
    const handleUpdate = (commentId) => {
        updateMutation.mutate({ commentId, content: updateValues.content });
        handleReset();
    };

    /* 리뷰 삭제 */
    const handleDelete = (commentId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            deleteMutation.mutate(commentId);
        }
    };

    return (
        <div className="flex flex-col gap-8 pt-10">
            <div className="flex items-end gap-2">
                <BiSolidComment className=" text-2xl text-black" />
                <span>1</span>
            </div>
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <textarea
                    className="w-full border border-gray-500 rounded-xl resize-none p-2"
                    name="content"
                    placeholder="리뷰를 입력해 주세요."
                    value={createValues.content}
                    onChange={handleCreateChange}
                ></textarea>
                <Btn onClick={() => {}}>작성하기</Btn>
            </form>
            <div className="flex flex-col gap-8">
                {comments?.map((comment) => (
                    <div key={comment.id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                            <p className="text-lg">{comment.user.nickname}</p>
                        </div>
                        {updateValues.id === comment.id ? (
                            <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                                <textarea className="w-full border border-gray-500 rounded-xl resize-none p-2" name="content" value={updateValues.content} onChange={handleUpdateChange}></textarea>
                                <FaCheck className="text-lg text-black cursor-pointer" onClick={() => handleUpdate(comment.id)} />
                            </form>
                        ) : (
                            <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4">
                                <p className="text-lg">{comment.content}</p>
                                {user?.id === comment.user.id && (
                                    <div className="flex gap-4">
                                        <LuPencilLine className="text-lg text-black cursor-pointer" onClick={() => handleChangeMode({ id: comment.id, content: comment.content })} />
                                        <RiDeleteBin6Line className="text-lg text-black cursor-pointer" onClick={() => handleDelete(comment.id)} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
