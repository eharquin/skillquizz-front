<script lang="ts">
    export let name: string;
    export let title: string;
    export let value: string | null;
</script>

<label for="{name}" class="block text-sm font-medium text-gray-700">{title}</label>
<div class="mt-1">
    <input type="text" name="{name}" id="{name}" bind:value="{value}" {...$$restProps}
           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
</div>