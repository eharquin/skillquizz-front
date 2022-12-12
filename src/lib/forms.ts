import {env} from "$env/dynamic/public";

export function submit(form: HTMLFormElement) {

  let submitting = false;

  /** @param {SubmitEvent} event */
  async function handle_submit(event: SubmitEvent) {
    event.preventDefault();

    if (submitting) return;
    submitting = true;

    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);

    const response = await fetch(new URL(form.getAttribute('action') ?? '', env.PUBLIC_BASE_URL), {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(data),
    });

    console.log(response);

    submitting = false

  }

  HTMLFormElement.prototype.addEventListener.call(form, 'submit', handle_submit);

  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form, 'submit', handle_submit);
    }
  };

}