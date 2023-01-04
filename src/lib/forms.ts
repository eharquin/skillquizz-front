import {goto} from "$app/navigation";
import {client} from "$lib/http";

export function submit(form: HTMLFormElement) {

    let submitting = false;

    /** @param {SubmitEvent} event */
    async function handle_submit(event: SubmitEvent) {
        event.preventDefault();

        if (submitting) return;
        submitting = true;

        const data = new Map<string, string>();
        new FormData(form).forEach((value, key) => data.set(key, value.toString()));
        
        try {
            const response = await client.request({
                method: form.getAttribute('method')?.toUpperCase() ?? 'POST',
                url: form.getAttribute('action') ?? '',
                data: JSON.stringify(Object.fromEntries(data)),
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
