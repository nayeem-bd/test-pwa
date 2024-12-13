import { AxiosError } from 'axios';
import { toast } from 'vue-sonner';

export function handleApiMutationError(err, form) {
  if (err instanceof AxiosError) {
    if (err?.response.status > 499) {
      toast.error('Server Error', {
        description: 'Something went wrong, please try again later',
        position: 'top-center'
      });
    }
    if (err?.response.status === 422) {
      const errors = err.response?.data?.errors;
      form.setErrors(errors);
    }
    if (err?.response.status === 400) {
      const errorData = err.response?.data;
      toast.warning('Validation Failed', {
        description: errorData?.message,
        position: 'top-center'
      });
    }
  } else {
    toast.error('Connection Failed', {
      description: 'Check your internet connection',
      position: 'top-center'
    });
  }
}
