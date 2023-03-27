import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { deleteItem } from "../../Api/item";
import * as S from "./style";

const DeleteItemModal = ({
  show,
  onCloseModal,
  setShowdeleteItemModal,
  item,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const itemDeleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      queryClient.setQueryData(["item", Number(item.id)], data);
      queryClient.invalidateQueries(["item", Number(item.id)]);
    },
  });
  const onDeleteItem = useCallback((e) => {
    e.preventDefault();
    itemDeleteMutation.mutate(item.id);
    setShowdeleteItemModal(false);
    navigate(-1);
    // TODO: 아이템 리스트 refetch
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <h3>아이템 삭제</h3>
      <h5>아이템을 삭제하면 복구할 수 없습니다.</h5>
      <h5>정말 삭제하시겠습니까?</h5>
      <S.ButtonWrapper>
        <S.CancelBtn type="reset">취소</S.CancelBtn>
        <S.DeleteBtn onClick={onDeleteItem}>삭제</S.DeleteBtn>
      </S.ButtonWrapper>
      <h5> </h5>
    </Modal>
  );
};

export default DeleteItemModal;
