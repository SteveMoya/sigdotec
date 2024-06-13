

const formatter: Intl.DateTimeFormat =
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })

export const getFormattedDate = (date: Date): string =>
  date ? formatter.format(date) : ''

export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0
  while (start < end && str[start] === ch) ++start
  while (end > start && str[end - 1] === ch) --end
  return start > 0 || end < str.length ? str.substring(start, end) : str
}

// Function to format a number in thousands (K) or millions (M) format depending on its value
export const toUiAmount = (amount: number) => {
  if (!amount) return 0

  let value: string

  if (amount >= 1000000000) {
    const formattedNumber = (amount / 1000000000).toFixed(1)
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'B'
    } else {
      value = formattedNumber + 'B'
    }
  } else if (amount >= 1000000) {
    const formattedNumber = (amount / 1000000).toFixed(1)
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'M'
    } else {
      value = formattedNumber + 'M'
    }
  } else if (amount >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(1)
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'K'
    } else {
      value = formattedNumber + 'K'
    }
  } else {
    value = Number(amount).toFixed(0)
  }

  return value
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('es-ES', options);
}

export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}



// Generate a random UUID

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}