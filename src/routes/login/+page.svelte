<script lang="ts">
    import {client} from "$lib/http";
    import {user} from "$lib/store";
    import {goto} from "$app/navigation";

    let email: string;
    let password: string;

    user.subscribe((value) => {
    	if (value != null) {
    		goto("/quizzes");
    	}
    });

    let handleLogin = () => {
        client.post('/login', {'username': email, password})
            .then(response => {
                user.set(response.data.token);
            })
            .catch(error => {
                console.log(error);
            });
    };
</script>

<div class="pt-8">
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700">Adresse mail</label>
            <div class="mt-1">
                <input type="text" bind:value="{email}"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <div class="mt-1">
                    <input type="password" bind:value="{password}"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-end mt-4">
        <button on:click={handleLogin}
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Créer
        </button>
    </div>
</div>