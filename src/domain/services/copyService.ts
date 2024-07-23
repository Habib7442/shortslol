import toast from 'react-hot-toast';

export class CopyService {
  static copyText(text: string) {
    if (!navigator.clipboard) {
      toast.error('Clipboard API not available, please try again');
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied');
      })
      .catch(() => {
        toast.error('Could not copy, please try again');
      });
  }
}
