<script lang="ts">
    import {onMount} from 'svelte';
    import {title} from "$lib/store";
    import type User from "$lib/types/user";
    import client from "$lib/http";
    import {page} from "$app/stores";

    let user: User | null = null;

    onMount(async () => {
        const res = await client.get('/user/' + $page.params.id);
        user = await res.data;
        title.set("Participations de " + user?.name);
    });
</script>

{#if user}
    <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Questionnaire
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Score</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Durée</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        {#each user.courses as course}
                            <tr>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{course.quizz.skill.subject}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.score}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.duration / 1000}
                                    secondes
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
{/if}