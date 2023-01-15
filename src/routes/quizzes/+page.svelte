<script lang="ts">
    import {title} from "$lib/store";
    import type Quizz from "$lib/types/quizz";
    import {onMount} from "svelte";
    import client from "$lib/http";
    import type Course from "$lib/types/course";
    import type Page from "$lib/types/page";

    title.set('Questionnaires');

    let quizzes: Page<Quizz[]> | null = null;
    let courses: Course[] = [];

    let searchQuery = ''
    let page = 0;

    $: if (searchQuery) {
        (async () => {
            const res = await client.get('/quizz', {params: {searchQuery, page}});
            quizzes = await res.data;
        })()
    }

    onMount(async () => {
        const res = await client.get('/quizz');
        quizzes = await res.data;
        const res2 = await client.get('/course');
        courses = await res2.data;
    });
</script>

<div class="flex justify-end">
    <form class="mt-1" on:submit|preventDefault>
        <input type="text" bind:value={searchQuery}
               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               placeholder="Recherche">
    </form>
</div>
<div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Compétence
                        </th>
                        <th scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Score moyen
                        </th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only"></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    {#if quizzes}
                        {#each quizzes.content as quizz}
                            <tr>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{quizz.skill.subject}</td>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">{quizz.avgScore}</td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    {#if courses.filter(course => course.quizz.id === quizz.id).length > 0}
                                        <a href="/courses/{courses.filter(course => course.quizz.id === quizz.id)[0].id}"
                                           class="text-indigo-600 hover:text-indigo-900">
                                            Voir la participation</a>
                                    {:else}
                                        <a href="/quizzes/{quizz.id}"
                                           class="text-indigo-600 hover:text-indigo-900">Participer</a>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    {/if}
                    </tbody>
                </table>
                {#if quizzes}
                    <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                         aria-label="Pagination">
                        <div class="hidden sm:block">
                            <p class="text-sm text-gray-700">
                                Page
                                <span class="font-medium">{page}</span>
                                de
                                <span class="font-medium">{quizzes.totalPages}</span>
                            </p>
                        </div>
                        <div class="flex flex-1 justify-between sm:justify-end">
                            {#if !quizzes.first}
                                <button on:click={(() => page--)()}
                                        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Précédente
                                </button>
                            {/if}
                            {#if !quizzes.last}
                                <button on:click={(() => page++)()}
                                        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Suivante
                                </button>
                            {/if}
                        </div>
                    </nav>
                {/if}
            </div>
        </div>
    </div>
</div>
