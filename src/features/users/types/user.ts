export type listItemsType = {
  id: number;
  title: string;
  subTitle: string;
  dateCreated: string;
};

export const items: listItemsType[] = [
  {
    id: 1,
    title: "Alice Johnson",
    subTitle: "Admin - alice@example.com",
    dateCreated: new Date("2025-10-25").toString(),
  },
  {
    id: 2,
    title: "Bob Smith",
    subTitle: "User - bob@example.com",
    dateCreated: new Date("2025-10-28").toString(),
  },
  {
    id: 3,
    title: "Charlie Brown",
    subTitle: "User - charlie@example.com",
    dateCreated: new Date("2025-10-30").toString(),
  },
];
