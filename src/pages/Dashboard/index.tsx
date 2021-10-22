import { useCallback, useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

import { FoodType } from '../../types';

export function Dashboard() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }
  const [foods, setFoods] = useState<FoodType[]>([])
  const [foodType, setFoodType] = useState<FoodType>();
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<Boolean>(false);

  useEffect(() => {
    const loadFoods = async () => {
      const response = await api.get<FoodType[]>('/foods');

      setFoods(response.data);
    }

    loadFoods();
  }, []);

  const handleAddFood = useCallback(
    async (food) => {
      try {
        const response = await api.post('/foods', {
          ...food,
          available: true,
        });

        setFoods(
          [
            ...foods,
            response.data
          ]
        )
      } catch (err) {
        console.log(err);
      }
    },
    [setFoods, foods]
  );

  const handleUpdateFood = useCallback(
    async (food) => {

      try {
        const foodUpdated = await api.put(
          `/foods/${foodType?.id}`,
          { ...foodType, ...food },
        );

        const foodsUpdated = foods.map(f =>
          f.id !== foodUpdated.data.id ? f : foodUpdated.data,
        );

        setFoods(foodsUpdated);
      } catch (err) {
        console.log(err);
      }
    },
    [foodType]
  );

  const handleDeleteFood = useCallback(
    async (id) => {
      await api.delete(`/foods/${id}`);

      const foodsFiltered = foods.filter(food => food.id !== id);

      setFoods(foodsFiltered);
    },
    [foods]
  );

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodType) {

    setFoodType(food);
    setEditModalOpen(true);
  }

  // render() {
  // const { modalOpen, editModalOpen, editingFood, foods } = this.state;

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={foodType}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

