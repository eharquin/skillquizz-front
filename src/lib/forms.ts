import {goto} from "$app/navigation";
import client from "$lib/http";
import formJson from "form-json";

export function submit(form: HTMLFormElement) {

    let submitting = false;

    /** @param {SubmitEvent} event */
    async function handle_submit(event: SubmitEvent) {
        event.preventDefault();

        if (submitting) return;
        submitting = true;

        console.log(formJson(form));
        try {
            const response = await client.request({
                method: form.getAttribute('method')?.toUpperCase() ?? 'POST',
                url: form.getAttribute('action') ?? '',
                data: JSON.stringify(formJson(form)),
            });

            if (response.status === 200) {
                await goto(form.getAttribute('data-redirect') ?? '/');
            }

        } catch (error) {
            console.log(error);
        }

        submitting = false;
    }

    form.addEventListener('submit', handle_submit);

    return {
        destroy() {
            form.removeEventListener('submit', handle_submit);
        }
    };

}
