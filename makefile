# ---------------------------
# Variables
# ---------------------------
FRONTEND_DIR=frontend
BACKEND_DIR=backend
DB_DIR=$(BACKEND_DIR)/db

include $(BACKEND_DIR)/.env


.PHONY: help

# ---------------------------
# Help
# ---------------------------
help:
	@echo ""
	@echo "================= MAKE COMMANDS ================="
	@echo "Usage: make <target>"
	@echo ""
	@echo "Available targets:"
	@echo "  help         Show this help manual"
	@echo ""
	@echo "---- Development & Production ----"
	@echo "  build        Build the frontend for production"
	@echo "  start        Build and start the backend in production mode"
	@echo "  dev          Start both frontend and backend in dev mode"
	@echo ""
	@echo "---- Setup & Maintenance ----"
	@echo "  install      Install root, frontend, and backend dependencies"
	@echo "  setup        Set up environment (installs dependencies and prepares DB)"
	@echo "  clean        Remove node_modules and lock files from all parts"
	@echo "  reinstall    Clean and reinstall all dependencies"
	@echo ""
	@echo "---- Database Commands ----"
	@echo "  db-shell     Open a MySQL shell for the dev database"
	@echo "  db-create    Create database schema and views from SQL files"
	@echo "  db-seed      Import seed data into the database if seed.sql exists"
	@echo "  db-dump      Dump the current database state to db/dump.sql"
	@echo "  db-reset     Drop, recreate, and reseed the database"
	@echo ""
	@echo "=================================================="
	@echo ""

# ---------------------------
# Production tasks
# ---------------------------
build:
	@echo " [*] Building frontend for production..."
	@make -C $(FRONTEND_DIR) build

start:
	@echo " [*] Starting backend in production mode..."
	@make build
	@make -C $(BACKEND_DIR) start



# Default dev command (frontend + backend)
dev:
	@echo " [*] Starting dev servers (frontend + backend)..."
	npm run dev

# ---------------------------
# Setup tasks
# ---------------------------

install:
	@echo " [*] Installing root dependencies..."
# 	@npm install
	@echo " [*] Installing frontend dependencies..."
	@make -C $(FRONTEND_DIR) install
	@echo " [*] Installing backend dependencies..."
	@make -C $(BACKEND_DIR) install
	@echo " [*] Install complete!"

setup: install
	@echo " [*] Setup complete!"


clean:
	@echo " [*] Cleaning node_modules and lock files..."
	@rm -rf node_modules package-lock.json
	@make -C $(FRONTEND_DIR) clean
	@make -C $(BACKEND_DIR) clean
	@echo " [*] Clean complete."

reinstall: clean setup
	@echo " [*] Reinstalled all dependencies."


# ---------------------------
# Database helpers (optional)
# ---------------------------
db-shell:
	@echo " [*] Opening MySQL shell..."
	@mysql -h $(DB_HOST) -u$(DB_USER) -p$(DB_PASS) $(DB_NAME)

db-create:
	@mysql -h $(DB_HOST) -u$(DB_USER) -p$(DB_PASS) --default-auth=caching_sha2_password < $(DB_DIR)/schema.sql
# 	@mysql -h $(DB_HOST) -u$(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(DB_DIR)/views.sql
	@echo ' [*] Created database'

db-seed:
	@echo "[*] Importing seed data..."
	@if [ -f "$(DB_DIR)/seed.sql" ]; then \
		mysql -h "$(DB_HOST)" -u"$(DB_USER)" -p"$(DB_PASS)" "$(DB_NAME)" < "$(DB_DIR)/seed.sql"; \
		echo "[*] Seed data imported."; \
	else \
		echo "[!] No seed.sql found at $(DB_DIR)/seed.sql."; \
	fi

db-dump:
	@mysqldump -h $(DB_HOST) -u$(DB_USER) -p$(DB_PASS) --databases $(DB_NAME) > $(DB_DIR)/dump.sql
	@echo ' [*] Dumped database'

db-reset:
	@echo "[*] Dropping and recreating database $(DB_NAME)..."
	@mysql -h $(DB_HOST) -u$(DB_USER) -p$(DB_PASS) -e "DROP DATABASE IF EXISTS $(DB_NAME);"
	@echo ' [*] Reset the database'
	@make db-create
	@make db-seed