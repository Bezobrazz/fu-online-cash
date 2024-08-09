import { FC, useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import {
  AddButton,
  Button,
  CategoriesModal,
  Input,
  Modal,
} from "../../components";

import { productFormSchema } from "../../schemas/productFormSchema";
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import {
  addProduct,
  editProduct,
  selectCategories,
  selectSalePoints,
} from "../../redux";
import type { BaseProduct, Product } from "../../types";

interface ProductFormProps {
  item?: Product;
  isEdit?: boolean;
  toggleModal: () => void;
}

export const ProductForm: FC<ProductFormProps> = ({
  item,
  isEdit,
  toggleModal,
}) => {
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

  useEffect(() => {
    if (isEdit && item) {
      setValue("name", item.name);
      setValue("article", item.article);
      setValue("price", item.price);
      setValue("quantity", item.quantity);
      setValue("category", item.category);
      setValue("salePointId", item.salePointId);
    }
  }, []);

  const onSubmit: SubmitHandler<BaseProduct> = (data) => {
    const action =
      isEdit && item?.id
        ? editProduct({ id: item.id, data })
        : addProduct(data);

    dispatch(action as any)
      .unwrap()
      .then(() => {
        toast.success(
          `Товар «${data.name}» був успішно ${isEdit ? "змінений" : "доданий"}.`
        );
        reset();
        toggleModal();
      })
      .catch(() =>
        toast.error(`Не вдалося ${isEdit ? "змінити" : "додати"} товар.`)
      );
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
          placeholder="Введіть назву продукту"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          label="Артікул:"
          name="article"
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
        <div className="flex flex-row gap-3 items-end">
          <div className="flex flex-col gap-1.5 flex-1 relative">
            <label className="text-[20px]">Категорія:</label>
            <select
              className="select select-bordered w-full field"
              disabled={categories.length === 0}
              {...register("category")}
              defaultValue=""
            >
              {categories.length !== 0 ? (
                <>
                  <option value="" disabled>
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
            <p className="field-error top-[84px]">
              {errors["category"]?.message}
            </p>
          </div>
          <AddButton size="48" onClick={toggle} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[20px]">Торгова точка:</label>
          {salePoints.length === 0 || salePoints.length > 3 ? (
            <div className="relative">
              <select
                className="select select-bordered w-full field"
                disabled={salePoints.length === 0}
                {...register("salePointId")}
                defaultValue=""
              >
                {salePoints.length !== 0 ? (
                  <>
                    <option value="" disabled>
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
              <p className="field-error top-[48px]">
                {errors["salePointId"]?.message}
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="flex flex-col gap-[10px] md:flex-row md:gap-6">
                {salePoints.map((salePoint) => (
                  <label className="flex gap-1" key={salePoint.id}>
                    <input
                      type="radio"
                      value={salePoint.id}
                      {...register("salePointId")}
                    />
                    {salePoint.title}
                  </label>
                ))}
              </div>
              <p className="field-error top-[20px]">
                {errors["salePointId"]?.message}
              </p>
            </div>
          )}
        </div>
        <Button type="submit" className="primary-btn">
          {!isEdit ? "Додати товар" : "Зберегти зміни"}
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
