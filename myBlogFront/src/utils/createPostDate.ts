export const createPostDate = (datePost: string) => {
    const date = new Date(datePost);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    const day = date.getDate();
    const formattedDate = `${day}.${month < 10 ? `0${month}` : month}.${year}`;
    return formattedDate; // Выводит: ГГГГ-ММ-ДД
  };