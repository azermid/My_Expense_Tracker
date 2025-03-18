<script lang="ts">
  import { settings, currencies } from "../stores/settingsStore";

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
  ];

  // Make these reactive to the settings store
  $: selectedLanguage = $settings.language;
  $: selectedCurrency = $settings.currency;

  function updateLanguage() {
    settings.setLanguage(selectedLanguage);
  }

  function updateCurrency() {
    settings.setCurrency(selectedCurrency);
  }
</script>

<div class="flex justify-end gap-4 mb-4">
  <select
    class="select"
    bind:value={selectedLanguage}
    on:change={updateLanguage}
  >
    {#each languages as lang}
      <option value={lang.code}>{lang.name}</option>
    {/each}
  </select>
</div>
