interface IHandbookList {
  name: string;
  href: string;
  id: number;
}

export const handbookList: IHandbookList[] = [
  {
    name: "Государства",
    href: "/handbook/goverment",
    id: 1,
  },
  {
    name: "Регионы",
    href: "/handbook/regions",
    id: 2,
  },
  {
    name: "Города",
    href: "/handbook/cityes",
    id: 3,
  },
  {
    name: "Индикаторы",
    href: "/handbook/indicators",
    id: 4,
  },
  {
    name: "Производства",
    href: "/handbook/productions",
    id: 5,
  },
  {
    name: "Отрасли",
    href: "/handbook/branch",
    id: 6,
  },
  {
    name: "Сотрудники",
    href: "/handbook/employee",
    id: 7,
  },
  {
    name: "Должности",
    href: "/handbook/post",
    id: 8,
  },
];
