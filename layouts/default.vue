<template>
  <div class="layout">
    <header class="header">
      <nav>
        <ul class="nav-list">
          <li class="nav-item"><NuxtLink to="/">Inicio</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/models">Modelos</NuxtLink></li>
          <li class="nav-item">
            <NuxtLink to="/manufacturers/[name].vue">Fabricantes</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/designers/[name].vue">Diseñadores</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <h1>Bienvenido al Catálogo de Superdeportivos</h1>
      <p>
        Explora los superdeportivos más increíbles, sus fabricantes y
        diseñadores.
      </p>

      <NuxtPage />
    </main>
    <footer class="footer">
      <p>
        &copy; 2024 Tu Empresa. Todos los derechos reservados. |
        <a href="/privacy-policy">Política de privacidad</a> |
        <a href="/terms-of-service">Términos de servicio</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import '~/assets/styles/layouts.css';
</script>
