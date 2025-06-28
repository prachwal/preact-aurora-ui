# Archive - Historical Documentation

This folder contains historical documentation that has been superseded by the new modular structure.

## Archived Files

### Original Planning Documents

- **DASHBOARD_CHECKLIST.md** - Original monolithic checklist (replaced by modular checklists)
- **MSUI_COMPLIANCE_PLAN.md** - Original compliance plan (content moved to guides and design-system)

### Component Implementation Plans (Phase 1 & 2)

- **PLAN_LAYOUT.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_HEADER.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_SIDEBAR.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_CONTENT.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_FOOTER.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_BREADCRUMBS.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_PAGEHEADER.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_GRID_ROW_COL.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_CARD.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_MENU.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_DRAWER.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_LOADER.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)
- **PLAN_RESPONSIVE.md** → Now in [guides/PHASE_1_CORE.md](../guides/PHASE_1_CORE.md)

### MD3 Enhancement Plans (Phase 2)

- **PLAN_BUTTON_MD3.md** → Now in [guides/PHASE_2_MD3.md](../guides/PHASE_2_MD3.md)
- **PLAN_HEADER_MD3_ENHANCEMENTS.md** → Now in [guides/PHASE_2_MD3.md](../guides/PHASE_2_MD3.md)
- **PLAN_BREADCRUMBS_MD3_ENHANCEMENTS.md** → Now in [guides/PHASE_2_MD3.md](../guides/PHASE_2_MD3.md)
- **PLAN_LOADER_MD3_PROGRESS.md** → Now in [guides/PHASE_2_MD3.md](../guides/PHASE_2_MD3.md)
- **PLAN_MENU_MD3_ENHANCEMENTS.md** → Now in [guides/PHASE_2_MD3.md](../guides/PHASE_2_MD3.md)
- **PLAN_MD3_COLOR_SYSTEM.md** → Now in [design-system/COLORS.md](../design-system/COLORS.md)

### Implementation Summaries

- **HEADER_MD3_COMPLETION_SUMMARY.md** - Completion summary (consolidated into guides)
- **LOADER_PROGRESS_MIGRATION_GUIDE.md** - Migration guide (consolidated into main migration guide)

### Technical Documentation

- **UNIVERSAL_THEME_SYSTEM.md** → Now in [design-system/README.md](../design-system/README.md)
- **LINTING_AND_FORMATTING.md** → Now in [CONTRIBUTING.md](../CONTRIBUTING.md)

### Historical Analysis Documents

- **COMPONENTS_ANALYSIS_AND_IMPROVEMENTS.md** - Initial component analysis
- **COMPONENTS_ANALYSIS_FINAL.md** - Final component analysis report
- **DASHBOARD_IMPLEMENTATION.md** - Implementation notes
- **FINAL_SUMMARY.md** - Project summary document
- **SCSS_IMPROVEMENTS_PLAN.md** - SCSS system improvement planning
- **THEME_PROVIDER.md** - Theme provider documentation
- **komponent.md** - Component planning document

## Migration to New Structure

The new modular structure provides:

1. **Clear Separation**: Checklists, plans, and implementation details in separate folders
2. **Modular Documentation**: No more monolithic files that grow indefinitely
3. **Publication Ready**: GitHub/npm ready structure
4. **Easy Maintenance**: Individual component plans in dedicated folders

### Current Active Documentation Structure

```
docs/
├── checklists/          # Concise implementation checklists
├── components/          # Individual component implementation plans
├── design-system/       # MD3 design tokens and system documentation
├── guides/             # Phase-based implementation guides
├── API_REFERENCE.md    # Publication-ready API documentation
├── MIGRATION_GUIDE.md  # Migration from other libraries
└── CONTRIBUTING.md     # Development contribution guide
```

For current documentation, see [../README.md](../README.md).
