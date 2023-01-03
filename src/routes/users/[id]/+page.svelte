<script lang="ts">
    import {submit} from '$lib/forms';
    import type {EditUserData} from "./+page";
    import TextInput from "$lib/forms/TextInput.svelte";
    import SelectInput from "$lib/forms/SelectInput.svelte";
    export let data: EditUserData;
</script>

<form class="pt-8" action="/user/{data.user.id}" x-method="patch" x-redirect="/users" use:submit>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <TextInput title="Nom" name="name" value="{data.user.name}"/>
        </div>

        <div class="sm:col-span-3">
            <SelectInput title="Type" name="type" options="{{'user': 'Utilisateur', 'admin': 'Administrateur'}}" value="{data.user.type}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Adresse mail" name="email" value="{data.user.email}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Entreprise" name="company" value="{data.user.company}"/>
        </div>

        <div class="sm:col-span-3">
            <TextInput title="Téléphone" name="phoneNumber" value="{data.user.phoneNumber}"/>
        </div>
    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <a href="/users" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</a>
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
        </div>
    </div>
</form>
