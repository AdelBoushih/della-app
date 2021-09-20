export function showLanguage(language: string): string {
  switch (language) {
    case "en": {
      return "English";
    }
    case "fr": {
      return "Français";
    }
    default: {
      return language;
    }
  }
}

export function codeLanguage(language: string): string {
  switch (language) {
    case "English": {
      return "en";
    }
    case "Français": {
      return "fr";
    }
    default: {
      return language;
    }
  }
}
