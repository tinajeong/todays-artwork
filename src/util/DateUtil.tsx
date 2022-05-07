export function getTodaysHash() {
    const today = new Date();
    return (
      String(today.getFullYear() + today.getMonth()).substring(0, 4) + String(today.getDate()).padStart(2, "0")
    );
  }
  