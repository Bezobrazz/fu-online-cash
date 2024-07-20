import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Button, CategoriesModal, Input, Modal } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import type { BaseProduct } from "../../types";
import { useEffect } from "react";
import { productFormSchema } from "../../schemas/productFormSchema";
import { FiPlus } from "react-icons/fi";
import { useModal } from "../../hooks";

interface ProductFormProps {
  salePoint: string;
}

export const ProductForm = ({ salePoint }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<BaseProduct>({
    mode: "onSubmit",
    resolver: yupResolver(productFormSchema),
  });

  const [isModal, toggle] = useModal();

  const categories = [
    // { id: "1", title: "Technology" },
    // { id: "2", title: "Health" },
    // { id: "3", title: "Finance" },
  ];

  useEffect(() => {
    setValue("salePoint", salePoint);
  }, []);

  const onSubmit: SubmitHandler<BaseProduct> = (date) => {
    console.log(date);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-6 px-7 max-w-[600px] w-full"
      >
        <Input
          name="name"
          type="text"
          placeholder="Введіть назву продукту"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          name="article"
          type="text"
          placeholder="Введіть артикул"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <div className="flex flex-row gap-3">
          <div className="w-full field">Виберіть категорію</div>
          <button
            type="button"
            className="bg-inherit w-[45px] flex items-center justify-center border border-gray-500 rounded-[6px]"
            onClick={toggle}
          >
            <FiPlus className="fill-gray-500 w-[100px]" />
          </button>
        </div>
        <Input
          name="price"
          type="number"
          placeholder="Введіть ціну"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Button type="submit" className="primary-btn">
          Додати
        </Button>
      </form>
      {isModal && (
        <Modal toggleModal={toggle} title="Категорії товарів">
          <CategoriesModal categories={categories} />
        </Modal>
      )}
    </>
  );
};
