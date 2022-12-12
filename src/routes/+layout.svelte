<script>
    import '../app.css'
    import Header from './Header.svelte'
    import {page} from '$app/stores';
    import { title } from "$lib/store.ts";
</script>

<div class="min-h-full">
    <Header/>
    <div class="py-10">
        <header>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{$title}</h1>
            </div>
        </header>
        <main>
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <slot/>
            </div>
        </main>
    </div>
</div>
