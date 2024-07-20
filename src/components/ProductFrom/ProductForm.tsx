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
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import { getCategories } from "../../redux/categories/categoriesOperations";
import { selectCategories } from "../../redux/categories/categoriesSlice";
import { selectSalePoints } from "../../redux/salePoints/salePointsSlice";
import { getSalePoints } from "../../redux/salePoints/salePointsOperations";

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
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const salePoints = useAppSelector(selectSalePoints);

  useEffect(() => {
    setValue("salePoint", salePoint);
    dispatch(getCategories());
    dispatch(getSalePoints());
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
          label="Назва:"
          name="name"
          type="text"
          placeholder="Введіть назву продукту"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          label="Артікул:"
          name="article"
          type="text"
          placeholder="Введіть артикул"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <div className="flex flex-row gap-3 items-end">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[20px]">Категорія:</label>
            <select
              className="select w-full field"
              disabled={categories.length === 0}
            >
              {categories.length !== 0 ? (
                <>
                  <option disabled selected>
                    Виберіть категорію
                  </option>
                  {categories.map((category) => (
                    <option key={category.id}>{category.title}</option>
                  ))}
                </>
              ) : (
                <option>Додайте категорію, натиснувши плюс</option>
              )}
            </select>
          </div>
          <button
            type="button"
            className="size-[48px] flex items-center justify-center border border-gray-500 rounded-md bg-gray-300 hover:bg-gray-500"
            onClick={toggle}
          >
            <FiPlus className="fill-blak size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[20px]">Торгова точка:</label>
          <select
            className="select w-full field"
            disabled={salePoints.length === 0}
          >
            {salePoints.length !== 0 ? (
              <>
                <option disabled selected>
                  Виберіть торгову точку
                </option>
                {salePoints.map((salePoints) => (
                  <option key={salePoints.id}>{salePoints.title}</option>
                ))}
              </>
            ) : (
              <option>Створіть торгову точку</option>
            )}
          </select>
        </div>
        <Input
          label="Ціна:"
          name="price"
          type="number"
          placeholder="Введіть ціну"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Button type="submit" className="primary-btn">
          Додати товар
        </Button>
      </form>
      {isModal && (
        <Modal
          toggleModal={toggle}
          title={`Категорії товарів ${
            categories.length !== 0 ? `(${categories.length})` : ""
          }`}
        >
          <CategoriesModal categories={categories} />
        </Modal>
      )}
    </>
  );
};
