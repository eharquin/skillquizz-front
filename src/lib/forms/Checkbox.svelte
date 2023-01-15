<script lang="ts">
    export let name: string;
    export let title: string;
    export let value: boolean;
</script>

<div class="relative flex items-start">
    <div class="flex h-5 items-center">
        <input id="{name}" name="{name}" bind:checked="{value}" type="checkbox"
               {...$$restProps}
               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
    </div>
    <div class="ml-3 text-sm">
        <label for="{name}" class="font-medium text-gray-700">{title}</label>
    </div>
</div>