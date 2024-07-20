import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input/Input";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { addCaterogyFormSchema } from "../../schemas";
import { Button } from "..";
import { useAppDispatch } from "../../hooks";
import { addCategory } from "../../redux/categories/categoriesOperations";
import type { Category, NewCategory } from "../../types";
import { isTitleUnique } from "../../helpers/isTitleUnique";
import { toast } from "react-toastify";

interface FormData {
  category: string;
}

interface AddCaterogyFormProps {
  categories: Category[];
}

export const AddCaterogyForm: React.FC<AddCaterogyFormProps> = ({
  categories,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(addCaterogyFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    const categoryToAdd: NewCategory = { title: data.category };

    if (!isTitleUnique(categories, categoryToAdd.title)) {
      return toast.error("Категорія з такою назвою вже існує");
    }

    dispatch(addCategory(categoryToAdd))
      .unwrap()
      .then(() => {
        toast.success(
          `Категорія «${categoryToAdd.title}» була успішно додана до списку.`
        );
        reset();
      })
      .catch((error) => {
        toast.error(`Не вдалося створити категорію: ${error.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        name={"category"}
        placeholder="Введіть назву категорії"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        Додати категорію
      </Button>
    </form>
  );
};
