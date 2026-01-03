import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// ⬅️ ВАЖНО: Link автоматически добавит /uk или /ru
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
