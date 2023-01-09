<script lang="ts">
    import {title} from "$lib/store";
    import { page } from '$app/stores';
    import {submit} from '$lib/forms';
    import TextInput from "$lib/forms/TextInput.svelte";
    import SelectInput from "$lib/forms/SelectInput.svelte";
    import type User from "$lib/types/user";
    import {onMount} from "svelte";
    import client from "$lib/http";
    import Skill from "../../../lib/types/skill";
    title.set("Compétence");

    let skill : Skill|null = null;

    onMount(async () => {
        const res = await client.get('/skill/' + $page.params.id);
        skill = await res.data;
        title.set("Compétence " + skill?.subject);
    });
</script>

<form class="flex justify-end" action="/skill/{skill?.id}" data-method="delete" data-redirect="/skills" use:submit>
    <button class="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Supprimer</button>
</form>

<form class="pt-8" action="/skill/{skill?.id}" data-method="patch" data-redirect="/skills" use:submit>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <TextInput title="Nom" name="subject" value="{skill?.subject}"/>
        </div>

    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <a href="/skills" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</a>
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sauvegarder</button>
        </div>
    </div>
</form>
