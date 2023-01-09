<script lang="ts">
    import {title} from "$lib/store";
    import type Quizz from "$lib/types/quizz";
    import {onMount} from "svelte";
    import client from "$lib/http";
    import type Course from "$lib/types/course";

    title.set('Questionnaires');

    let quizzes: Quizz[] = [];
    let courses: Course[] = [];

    onMount(async () => {
        const res = await client.get('/quizz');
        quizzes = await res.data;
        const res2 = await client.get('/course');
        courses = await res2.data;
    });
</script>

<div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Compétence
                        </th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only"></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    {#each quizzes as quizz}
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{quizz.skill.subject}</td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                {#if courses.filter(course => course.quizz.id === quizz.id).length > 0}
                                    <a href="/courses/{courses.filter(course => course.quizz.id === quizz.id)[0].id}" class="text-indigo-600 hover:text-indigo-900">
                                        Voir la participation</a>
                                {:else}
                                    <a href="/quizzes/{quizz.id}"
                                       class="text-indigo-600 hover:text-indigo-900">Participer</a>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
