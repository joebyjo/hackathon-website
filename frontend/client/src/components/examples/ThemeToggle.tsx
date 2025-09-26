import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="text-sm text-muted-foreground">
          Click to toggle between light, dark, and system themes
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-card border rounded-lg">
          <h3 className="font-semibold">Sample Card</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This card will change appearance based on the selected theme.
          </p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold">Muted Background</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Notice how colors adapt to the theme.
          </p>
        </div>
        <div className="p-4 bg-primary text-primary-foreground rounded-lg">
          <h3 className="font-semibold">Primary Colors</h3>
          <p className="text-sm opacity-90 mt-2">
            Primary colors work in both themes.
          </p>
        </div>
      </div>
    </div>
  );
}