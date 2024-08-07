import { CardListItem } from "./CardListItem";

import type { CardListItemType } from "../../types";

interface CardListProps {
  title: string;
  items: CardListItemType[];
}

export const CardList = ({ title, items }: CardListProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[20px]">{title}</h2>
      <ul className="flex flex-col gap-2 h-[600px] overflow-scroll">
        {items.map((item) => (
          <CardListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
