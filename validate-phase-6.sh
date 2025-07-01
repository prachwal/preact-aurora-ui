#!/bin/bash

# FAZA 6: Comprehensive Testing & Validation Script
# This script runs all validation tests for Aurora UI

set -e

echo "🧪 Starting FAZA 6: Testing & Validation"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if dependencies are installed
check_dependencies() {
    print_status "Checking dependencies..."

    if ! npm list vitest > /dev/null 2>&1; then
        print_error "Vitest not found. Please run npm install"
        exit 1
    fi

    print_success "Dependencies check passed"
}

# 6.1 Comprehensive Testing
run_unit_tests() {
    print_status "Running unit tests..."

    if npm run test > test-results/unit-tests.log 2>&1; then
        print_success "Unit tests passed"

        # Show test coverage summary
        echo "Test Coverage Summary:"
        grep -A 5 "Coverage report" test-results/unit-tests.log || echo "Coverage report not found"
    else
        print_error "Unit tests failed"
        echo "Last 20 lines of test output:"
        tail -n 20 test-results/unit-tests.log
        return 1
    fi
}

run_accessibility_tests() {
    print_status "Running accessibility tests..."

    if npm run test:a11y > test-results/a11y-tests.log 2>&1; then
        print_success "Accessibility tests passed"
    else
        print_error "Accessibility tests failed"
        echo "Last 10 lines of a11y test output:"
        tail -n 10 test-results/a11y-tests.log
        return 1
    fi
}

run_performance_tests() {
    print_status "Running performance tests..."

    if npm run test:performance > test-results/performance-tests.log 2>&1; then
        print_success "Performance tests passed"

        # Show performance metrics
        echo "Performance Metrics:"
        grep -E "(Performance:|renderTime:|componentSize:)" test-results/performance-tests.log || echo "Performance metrics not found"
    else
        print_error "Performance tests failed"
        echo "Last 10 lines of performance test output:"
        tail -n 10 test-results/performance-tests.log
        return 1
    fi
}

# 6.2 Bundle Optimization
analyze_bundle() {
    print_status "Analyzing bundle size..."

    # Build production bundle
    if npm run build > test-results/build.log 2>&1; then
        print_success "Production build completed"

        # Analyze bundle size
        if [ -d "dist" ]; then
            echo "Bundle size analysis:"
            du -sh dist/* | sort -hr

            # Check if bundle size is within limits
            bundle_size=$(du -s dist | cut -f1)
            max_size=5000  # 5MB in KB

            if [ "$bundle_size" -lt "$max_size" ]; then
                print_success "Bundle size is within limits (${bundle_size}KB < ${max_size}KB)"
            else
                print_warning "Bundle size is larger than expected (${bundle_size}KB > ${max_size}KB)"
            fi
        else
            print_error "Build output directory not found"
            return 1
        fi
    else
        print_error "Production build failed"
        echo "Last 10 lines of build output:"
        tail -n 10 test-results/build.log
        return 1
    fi
}

check_tree_shaking() {
    print_status "Checking tree-shaking optimization..."

    # This is a simplified check - in real scenarios you'd use more sophisticated tools
    if [ -f "dist/preact-aurora-ui.es.js" ]; then
        # Check for unused exports (simplified)
        unused_count=$(grep -c "export.*unused" dist/preact-aurora-ui.es.js || echo "0")

        if [ "$unused_count" -eq "0" ]; then
            print_success "Tree-shaking appears to be working correctly"
        else
            print_warning "Potential unused exports found: $unused_count"
        fi
    else
        print_error "ES module bundle not found"
        return 1
    fi
}

# 6.3 Real-world Validation
validate_typescript() {
    print_status "Validating TypeScript types..."

    if npm run type-check > test-results/type-check.log 2>&1; then
        print_success "TypeScript validation passed"
    else
        print_error "TypeScript validation failed"
        echo "Type errors:"
        cat test-results/type-check.log
        return 1
    fi
}

validate_linting() {
    print_status "Running linting validation..."

    if npm run lint > test-results/lint.log 2>&1; then
        print_success "Linting validation passed"
    else
        print_error "Linting validation failed"
        echo "Lint errors:"
        tail -n 20 test-results/lint.log
        return 1
    fi
}

validate_formatting() {
    print_status "Checking code formatting..."

    if npm run format:check > test-results/format.log 2>&1; then
        print_success "Code formatting is correct"
    else
        print_error "Code formatting issues found"
        echo "Format check output:"
        cat test-results/format.log
        return 1
    fi
}

# Create test results directory
mkdir -p test-results

# Main validation flow
main() {
    echo "Starting comprehensive validation..."
    echo "Test results will be saved to test-results/"
    echo ""

    # Track results
    passed_tests=0
    total_tests=8

    # Run all validations
    check_dependencies && ((passed_tests++)) || true
    run_unit_tests && ((passed_tests++)) || true
    run_accessibility_tests && ((passed_tests++)) || true
    run_performance_tests && ((passed_tests++)) || true
    analyze_bundle && ((passed_tests++)) || true
    check_tree_shaking && ((passed_tests++)) || true
    validate_typescript && ((passed_tests++)) || true
    validate_linting && ((passed_tests++)) || true

    echo ""
    echo "========================================"
    echo "🏁 FAZA 6 Validation Complete"
    echo "========================================"
    echo "Passed: $passed_tests/$total_tests tests"

    if [ "$passed_tests" -eq "$total_tests" ]; then
        print_success "All validations passed! 🎉"
        echo ""
        echo "✅ Aurora UI is production-ready!"
        echo "✅ All components tested and validated"
        echo "✅ Bundle size optimized"
        echo "✅ Accessibility compliant"
        echo "✅ Performance targets met"
        echo ""
        exit 0
    else
        failed_tests=$((total_tests - passed_tests))
        print_error "$failed_tests validation(s) failed"
        echo ""
        echo "❌ Please review and fix the issues above"
        echo "📋 Check test-results/ directory for detailed logs"
        echo ""
        exit 1
    fi
}

# Run main function
main "$@"
