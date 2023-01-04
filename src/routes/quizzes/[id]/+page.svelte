<script lang="ts">
    import {title} from "$lib/store";
    import {submit} from '$lib/forms';
    import {page} from '$app/stores';
    import type Quizz from "$lib/types/quizz";
    import {onMount} from "svelte";
    import {client} from "$lib/http";

    let quizz: Quizz | null = null;

    onMount(async () => {
        const res = await client.get('/quizz/' + $page.params.id);
        quizz = await res.data;
        title.set("Quizz " + quizz?.skill)
    });
</script>

{#if (quizz)}
    <form class="pt-8" action="/quizz/{quizz?.id}" data-method="post" data-redirect="/quizzes" use:submit>
        {#each quizz?.questions as question, i}
            <div>
                <label class="text-base font-medium text-gray-900">{question.text}</label>
                <fieldset class="mt-4">
                    <legend class="sr-only">Notification method</legend>
                    <div class="space-y-4">
                        {#each question.answers as answer}
                            <div class="flex items-center">
                                <input id="email" name="notification-method" type="radio"
                                       class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                <label for="email"
                                       class="ml-3 block text-sm font-medium text-gray-700">{answer.text}</label>
                            </div>
                        {/each}
                    </div>
                </fieldset>
            </div>
        {/each}
        <div class="pt-5">
            <div class="flex justify-end">
                <button type="submit"
                        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Save
                </button>
            </div>
        </div>
    </form>
{/if}