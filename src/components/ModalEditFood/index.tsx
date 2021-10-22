import { Component, createRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import { Input } from '../Input';
import { FoodType } from '../../types';

interface ModalEditFood {
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodType) => Promise<void>;
  isOpen: Boolean;
  editingFood: FoodType | undefined;
}

export function ModalEditFood({ setIsOpen, handleUpdateFood, isOpen, editingFood }: ModalEditFood) {

  const formRef = createRef();

  const handleSubmit = useCallback(
    async (data) => {
      handleUpdateFood(data);
      setIsOpen();
    },
    [setIsOpen, handleUpdateFood]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

};
