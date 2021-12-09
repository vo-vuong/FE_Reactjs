import { format } from 'date-fns';

export function formatDateTime(timestamp) {
  var date = new Date(timestamp);

  return format(new Date(date), 'dd MMM yyyy HH:mm');
}
