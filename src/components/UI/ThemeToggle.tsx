import { Moon, Sun } from "lucide-react";
import { useAppStore } from "../store/appStore";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <span
      onClick={toggleTheme}
      className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-lg bg-light-blue hover:bg-light-cyan dark:bg-dark-surface dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
      title={theme === 'light' ? 'Verander naar donkere modus' : 'Verander naar lichte modus'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-white" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </span>
  );
};
