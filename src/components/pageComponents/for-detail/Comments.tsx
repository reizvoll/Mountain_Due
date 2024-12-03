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

    const {
        values: createValues,
        handleChange: handleCreateChange,
        handleReset: handleCreateReset
    } = useForm({
        content: ''
    });

    const {
        values: updateValues,
        handleChange: handleUpdateChange,
        handleMultiple,
        handleReset: handleUpdateReset
    } = useForm({
        id: '',
        content: ''
    });

    /* 리뷰 작성 */
    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate({ userId: user.id, placeId: spotId, ...createValues });
        handleCreateReset();
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
        handleUpdateReset();
    };

    /* 리뷰 삭제 */
    const handleDelete = (commentId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            deleteMutation.mutate(commentId);
        }
    };

    return (
        <div className="flex flex-col gap-4 pt-10">
            <div className="flex items-end gap-2">
                <BiSolidComment className="text-xl" />
                <p className="text-xl font-bold">{comments?.length}</p>
            </div>
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <textarea
                    className="w-full border border-gray-500 rounded-2xl resize-none p-4"
                    name="content"
                    placeholder="리뷰를 입력해 주세요."
                    value={createValues.content}
                    onChange={handleCreateChange}
                ></textarea>
                <Btn onClick={() => {}}>작성하기</Btn>
            </form>
            <div className="flex flex-col gap-4">
                {comments?.map((comment) => (
                    <div key={comment.id} className="flex flex-col gap-2 border border-gray-300 rounded-2xl p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full" />
                            <p className="text-base font-bold">{comment.user.nickname}</p>
                        </div>
                        {updateValues.id === comment.id ? (
                            <form className="flex items-center" onSubmit={handleSubmit}>
                                <textarea className="w-full border border-gray-500 rounded-2xl resize-none ml-8 mr-4 p-4" name="content" value={updateValues.content} onChange={handleUpdateChange}></textarea>
                                <FaCheck className="text-xl cursor-pointer" onClick={() => handleUpdate(comment.id)} />
                            </form>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p className="text-base px-8 whitespace-pre-wrap">{comment.content}</p>
                                {user?.id === comment.user.id && (
                                    <div className="flex gap-4">
                                        <LuPencilLine className="text-xl cursor-pointer" onClick={() => handleChangeMode({ id: comment.id, content: comment.content })} />
                                        <RiDeleteBin6Line className="text-xl cursor-pointer" onClick={() => handleDelete(comment.id)} />
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
