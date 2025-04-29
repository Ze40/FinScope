import type { ForwardRefExoticComponent, RefAttributes } from "react";

import {
  Book,
  BookMarkedIcon,
  Database,
  LayoutDashboard,
  type LucideProps,
  Settings,
} from "lucide-react";

interface IPage {
  id: number;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const pageList: IPage[] = [
  {
    id: 1,
    name: "Данные",
    href: "/",
    icon: Database,
  },
  {
    id: 2,
    name: "Статистика",
    href: "/statistick",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    name: "Справочники",
    href: "/handbook",
    icon: Book,
  },

  {
    id: 4,
    name: "Отчеты",
    href: "/reports",
    icon: BookMarkedIcon,
  },
  {
    id: 5,
    name: "О программе",
    href: "/about-programm",
    icon: Settings,
  },
];
