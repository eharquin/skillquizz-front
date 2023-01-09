<script lang="ts">
    import {title} from "../../../lib/store";
    title.set('Créer un quiz');

    import {submit} from '../../../lib/forms';
    import TextInput from "../../../lib/forms/TextInput.svelte";
    import SelectInput from "../../../lib/forms/SelectInput.svelte";
    import Skill from "../../../lib/types/skill";
    import {onMount} from "svelte";
    import client from "../../../lib/http";
    let selected;

    let skills: Skill[] = [];

    onMount(async () => {
        const res = await client.get('/skill');
        skills = await res.data;
    });
</script>

<form class="pt-8" action="/quizz" data-redirect="/quizzes" use:submit>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <TextInput title="Nom" name="nom"/>
        </div>

        <div class="sm:col-span-3">
            <select bind:value={selected} >
                {#each skills as skill}
                    <option value={skill}>
                        {skill.subject}
                    </option>
                {/each}
            </select>
        </div>

    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <a href="/users"
               class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</a>
            <button type="submit"
                    class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
            </button>
        </div>
    </div>
</form>
