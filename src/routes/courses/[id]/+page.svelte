<script lang="ts">
    import {title} from "$lib/store";
    import {submit} from '$lib/forms';
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import client from "$lib/http";
    import type Course from "$lib/types/course";

    let course: Course | null = null;

    onMount(async () => {
        const res = await client.get('/course/' + $page.params.id);
        course = await res.data;
        title.set("Réponses à " + course?.quizz.skill.subject);
    });
</script>

{#if course}
    <div>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt class="truncate text-sm font-medium text-gray-500">Durée</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{course.duration / 1000} secondes</dd>
            </div>

            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt class="truncate text-sm font-medium text-gray-500">Score</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{course.score} points</dd>
            </div>
        </dl>
    </div>
    <form class="pt-8" action="/quizz/{course.quizz?.id}" data-method="post" data-redirect="/quizzes" use:submit>
        {#each course.quizz?.questions as question, i}
            <div class="m-4">
                <label class="text-base font-medium text-gray-900">{question.text}</label>
                <fieldset class="mt-4">
                    <legend class="sr-only">Notification method</legend>
                    <div class="space-y-4">
                        {#each question.answers as answer}
                            <div class="flex items-center">
                                <input id="email" name={question.id} type="radio"
                                       class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                       checked={course?.answers[i] === answer.id} disabled>
                                {#if (answer.id === question.goodAnswer)}
                                    <label for="email"
                                           class="ml-3 block text-sm font-medium text-green-700">{answer.text}</label>
                                {:else}
                                    <label for="email"
                                           class="ml-3 block text-sm font-medium text-gray-700">{answer.text}</label>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </fieldset>
            </div>
        {/each}
    </form>
{/if}