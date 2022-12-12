<script lang="ts">
    export let name: string;
    export let title: string;
    export let options: Map<string, string>;
    export let value: string | null;
</script>

<label for="{name}" class="block text-sm font-medium text-gray-700">{title}</label>
<div class="mt-1">
    <select id="{name}" name="{name}" bind:value={value}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        {#each Object.entries(options) as [optionName, optionTitle]}
            <option value="{optionName}">{optionTitle}</option>
        {/each}
    </select>
</div>