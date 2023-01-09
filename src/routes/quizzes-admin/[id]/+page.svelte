<script lang="ts">
    import {title} from "$lib/store";
    import { page } from '$app/stores';
    import {submit} from '$lib/forms';
    import TextInput from "$lib/forms/TextInput.svelte";
    import SelectInput from "$lib/forms/SelectInput.svelte";
    import type Quizz from "$lib/types/quizz";
    import {onMount} from "svelte";
    import client from "$lib/http";
    import Skill from "../../../lib/types/skill";
    title.set("Quiz");

    let quiz : Quizz|null = null;

    onMount(async () => {
        const res = await client.get('/quizz/' + $page.params.id);
        quiz = await res.data;
        title.set("Quiz " + quiz?.nom);
    });

    async function deleteAnswer(id) {
        await client.delete('/answer/' + id);
    }

    async function deleteQuestion(id) {
        await client.delete('/question/' + id);
    }
</script>

<div class="flex justify-end">
    <a href="/questions-admin/create" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Créer une question</a>
</div>

<form class="flex justify-end" action="/admin/quizz/{quiz?.id}" data-method="delete" data-redirect="/skills" use:submit>
    <button class="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Supprimer</button>
</form>

<form class="pt-8" action="/admin/quizz/{quiz?.id}" data-method="patch" data-redirect="/quizzes-admin" use:submit>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <TextInput title="Nom" name="nom" value="{quiz?.nom}"/>
        </div>
        <div class="sm:col-span-6">
            <TextInput title="Compétence" name="subject" value="{quiz?.skill?.subject}"/>
        </div>
        <div>
            <a href="/questions-admin/create/{quiz.id}" class="text-indigo-600 hover:text-indigo-900">Ajouter une question</a>
        </div>
        {#each quiz.questions as question}

            <div class="sm:col-span-6">
                <TextInput title="Nom" name="nom" value="{question.nom}"/>
            </div>
            <div class="sm:col-span-6">
                <TextInput title="Compétence" name="subject" value="{question.order}"/>
            </div>
            <div>
                <a href="/answers-quiz/{quiz.id}" onclick="deleteQuestion(question.id)" class="text-indigo-600 hover:text-indigo-900">Suppriemr la question</a>
            </div>
            <div>
                <a href="/answers-admin/create/{quiz.id}/{question.id}" class="text-indigo-600 hover:text-indigo-900">Ajouter une réponse</a>
            </div>

            <!-- mettre bouton supprimer, éditer -->
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Texte
                    </th>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Bonne réponse (oui non)
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Editer</span>
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Supprimer</span>
                    </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                {#each question.answers as answer}
                    <tr>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{answer.text}</td>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{answer.goodAnswer}</td>

                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="/answers-admin/{answer.id}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="/answers-quiz/{quiz.id}" onclick="deleteAnswer(answer.id)" class="text-indigo-600 hover:text-indigo-900">Delete</a>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/each}

    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <a href="/skills" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</a>
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sauvegarder</button>
        </div>
    </div>
</form>
