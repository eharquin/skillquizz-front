<script lang="ts">
    import {title} from "$lib/store";
    import {submit} from '$lib/forms';
    import TextInput from "$lib/forms/TextInput.svelte";
    import SelectInput from "$lib/forms/SelectInput.svelte";
    import type User from "$lib/types/user";
    export let data: User;
    title.set("Utilisateur " + data.name);
</script>

<form class="flex justify-end" action="/user/{data.id}" data-method="delete" data-redirect="/users" use:submit>
    <button class="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Supprimer</button>
</form>

<form class="pt-8" action="/user/{data.id}" data-method="patch" data-redirect="/users" use:submit>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <TextInput title="Nom" name="name" value="{data.name}"/>
        </div>

        <div class="sm:col-span-3">
            <SelectInput title="Type" name="type" options="{{'user': 'Utilisateur', 'admin': 'Administrateur'}}" value="{data.type}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Adresse mail" name="email" value="{data.email}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Entreprise" name="company" value="{data.company}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Téléphone" name="phoneNumber" value="{data.phoneNumber}"/>
        </div>
    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <a href="/users" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</a>
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sauvegarder</button>
        </div>
    </div>
</form>
