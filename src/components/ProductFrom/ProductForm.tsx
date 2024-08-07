import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { Button, CategoriesModal, Input, Modal } from "..";
import { productFormSchema } from "../../schemas/productFormSchema";
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import { selectCategories } from "../../redux/categories/categoriesSlice";
import { selectSalePoints } from "../../redux/salePoints/salePointsSlice";
import type { BaseProduct } from "../../types";
import { addProduct } from "../../redux/products/productsOperations";

export const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BaseProduct>({
    mode: "onSubmit",
    resolver: yupResolver(productFormSchema),
  });

  const [isModal, toggle] = useModal();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const salePoints = useAppSelector(selectSalePoints);

  const handleSetCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("category", e.target.value);
  };

  const handleSetSalePoint = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("salePointId", e.target.value);
  };

  const onSubmit: SubmitHandler<BaseProduct> = (date) => {
    dispatch(addProduct(date))
      .unwrap()
      .then(() => {
        toast.success(`Продукт «${date.name}» був успішно доданий.`);
        reset();
      })
      .catch(() => toast.error(`Не вдалося додати товар.`));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
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
        <Input
          label="Ціна:"
          name="price"
          type="number"
          placeholder="Введіть ціну"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          label="Кількість:"
          name="quantity"
          type="number"
          placeholder="Введіть кількість товару"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        {/* <div className="flex flex-row gap-3 items-end">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[20px]">Категорія:</label>
            <select
              className="select w-full field"
              disabled={categories.length === 0}
              // onChange={handleSetCategory}
            >
              {categories.length !== 0 ? (
                <>
                  <option value="" disabled selected>
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
        </div> */}
        {/* <div className="flex flex-col gap-1.5">
          <label className="text-[20px]">Торгова точка:</label>
          <select
            className="select w-full field"
            disabled={salePoints.length === 0}
            onChange={handleSetSalePoint}
          >
            {salePoints.length !== 0 ? (
              <>
                <option value="" disabled selected>
                  Виберіть торгову точку
                </option>
                {salePoints.map((salePoint) => (
                  <option key={salePoint.id} value={salePoint.id}>
                    {salePoint.title}
                  </option>
                ))}
              </>
            ) : (
              <option>Створіть торгову точку</option>
            )}
          </select>
        </div> */}
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
