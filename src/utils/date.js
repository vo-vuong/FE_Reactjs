import { format } from 'date-fns';

export function formatDateTime(timestamp) {
  var timestamp = 1607110465663;
  var date = new Date(timestamp);

  return format(new Date(date), 'dd MMM yyyy HH:mm');
}
